import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Interface pour la vulnérabilité
interface Vulnerability {
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  title: string;
  description: string;
  location?: string;
  evidence?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse le body
    const body = await request.json();
    const { vulnerability } = body as { vulnerability: Vulnerability };

    if (!vulnerability) {
      return NextResponse.json(
        { error: 'Vulnerability data is required' },
        { status: 400 }
      );
    }

    // Vérifie la clé Groq
    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      console.error('GROQ_API_KEY is missing');
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      );
    }

    // Mode DEMO - pas de vérification de tokens
    const isDemoMode = process.env.DEMO_MODE === 'true';

    // Si pas en mode DEMO, vérifie les tokens (optionnel)
    if (!isDemoMode) {
      // Récupère les cookies de manière asynchrone (Next.js 15+)
      const cookieStore = await cookies();
      const authToken = cookieStore.get('auth_token');

      if (!authToken) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        );
      }

      // Ici tu pourrais vérifier les tokens de l'utilisateur
      // Pour l'instant on laisse passer en mode DEMO
    }

    // Crée le prompt pour Groq
    const prompt = `Tu es un expert en cybersécurité. Analyse cette vulnérabilité et fournis une réponse UNIQUEMENT en JSON (pas de markdown, pas de backticks).

Vulnérabilité:
- Type: ${vulnerability.type}
- Sévérité: ${vulnerability.severity}
- Titre: ${vulnerability.title}
- Description: ${vulnerability.description}
${vulnerability.location ? `- Location: ${vulnerability.location}` : ''}
${vulnerability.evidence ? `- Evidence: ${vulnerability.evidence}` : ''}

Réponds UNIQUEMENT avec un objet JSON contenant:
{
  "exploitation": "Explication détaillée de comment un hacker peut exploiter cette vulnérabilité (3-5 phrases)",
  "recommendations": "Recommandations concrètes pour corriger cette vulnérabilité avec des exemples de code si pertinent (3-5 phrases)"
}

IMPORTANT: Réponds UNIQUEMENT en JSON, sans aucun texte avant ou après, sans markdown, sans backticks.`;

    // Appel à l'API Groq
    console.log('Calling Groq API...');
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.error('Groq API error:', errorText);
      
      // Fallback avec explications pré-écrites
      return NextResponse.json({
        exploitation: `Cette vulnérabilité de type ${vulnerability.type} (${vulnerability.severity}) peut permettre à un attaquant d'exploiter ${vulnerability.title}. ${vulnerability.description}`,
        recommendations: `Pour corriger cette vulnérabilité : 1) Appliquez les bonnes pratiques de sécurité, 2) Mettez à jour vos configurations, 3) Implémentez les headers de sécurité manquants, 4) Testez régulièrement votre application.`
      });
    }

    const groqData = await groqResponse.json();
    console.log('Groq response:', groqData);

    // Extrait le contenu de la réponse
    const content = groqData.choices?.[0]?.message?.content || '';
    
    // Parse le JSON de la réponse
    let parsedContent;
    try {
      // Enlève les backticks markdown si présents
      const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsedContent = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error('Failed to parse Groq response:', content);
      
      // Fallback si le parsing échoue
      return NextResponse.json({
        exploitation: content.substring(0, 500) || `Cette vulnérabilité ${vulnerability.title} peut être exploitée par un attaquant.`,
        recommendations: `Consultez les bonnes pratiques OWASP pour ${vulnerability.type}.`
      });
    }

    // Retourne la réponse
    return NextResponse.json({
      exploitation: parsedContent.exploitation || 'Explication non disponible',
      recommendations: parsedContent.recommendations || 'Recommandations non disponibles',
      demoMode: isDemoMode
    });

  } catch (error) {
    console.error('Error in AI explain API:', error);
    
    // Fallback en cas d'erreur
    return NextResponse.json({
      exploitation: 'Une erreur s\'est produite lors de la génération de l\'explication. Cette vulnérabilité nécessite une attention particulière.',
      recommendations: 'Consultez la documentation OWASP et les bonnes pratiques de sécurité pour corriger cette vulnérabilité.'
    });
  }
}
