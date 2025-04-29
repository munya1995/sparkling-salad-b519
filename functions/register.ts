export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const { fullname, email } = await request.json();

    const res = await fetch(
      'https://public-eur.mkt.dynamics.com/api/v1.0/orgs/c325387f-2b24-f011-9aed-000d3ade3847/eventmanagement/eventregistrations',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.D365_TOKEN}`, // Ensure the token is set correctly
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contact: { fullname, email },
          event: { id: env.EVENT_ID }, // Ensure the event ID is set correctly
          registrationstatus: 'Registered',
        }),
      }
    );

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || 'Unknown error' }),
      { status: 500 }
    );
  }
}
