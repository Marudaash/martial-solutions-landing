/**
 * API Route: Trigger Retell outbound demo call
 * POST /api/demo-call
 */

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { phone, agentId, firstName } = body;

    if (!phone || !agentId) {
      return new Response(JSON.stringify({ error: 'Missing phone or agentId' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Trigger Retell outbound call
    const retellResponse = await fetch('https://api.retellai.com/v2/create-phone-call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RETELL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from_number: null,  // Use agent's assigned number
        to_number: phone,
        agent_id: agentId,
        retell_llm_dynamic_variables: {
          customer_name: firstName || 'there',
        },
      }),
    });

    if (!retellResponse.ok) {
      const error = await retellResponse.text();
      console.error('Retell Error:', error);
      return new Response(JSON.stringify({ error: 'Failed to initiate call' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const call = await retellResponse.json();

    return new Response(JSON.stringify({ 
      success: true, 
      callId: call.call_id 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
