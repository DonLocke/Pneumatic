export async function GET({ locals, params }) {
  const response = await fetch('http://box-100.locke.casa/open', {
    method: 'GET',
    headers: { 'Content-Type': 'text/plain' }
  });

  const result = await response.text();

  console.log(result);
  if (result == "Opened") {
    const pgResult = locals.postgres?.query("INSERT INTO box_history (box_id, event_type) VALUES ($1, 'OPEN')", [params.box_id]);
    console.log("Database: ", pgResult);

    return new Response(result);
  } else {
    return new Response(result);
  }
}
