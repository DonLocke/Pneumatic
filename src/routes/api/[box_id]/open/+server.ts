export async function GET({ locals, params }) {
  let result;

  console.log("Opening Box #", params.box_id);
  if(params.box_id == "1") {
    const response = await fetch('http://box-100.locke.casa/open', {
      method: 'GET',
      headers: { 'Content-Type': 'text/plain' }
    });

    result = await response.text();
    console.log("Box Repsonse: ", result);
  }
  

  if (result == "Open") {
    const pgResult = await locals.postgres?.query("INSERT INTO box_history (box_id, event_type) VALUES ($1, 'OPEN')", [params.box_id]);
    console.log("Database: ", pgResult);

    return new Response(result);
  } else {
    return new Response(result);
  }
}
