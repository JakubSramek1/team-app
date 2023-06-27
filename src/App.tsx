import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";


function App() {
  const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || ''
 useEffect(() => {
  handler()
 }, [])

   const supabase = createClient(
    "https://nktebdhspzvpwguqcksn.supabase.co/rest/v1/teams?select=*",
    supabaseKey
  );

  const handler = async () => {
    const { data, error } = await supabase
  .from('countries')
  .select()
  console.log(data)
  }

  return (
    <div className="App">
     ewfgdsg
    </div>
  );
}

export default App;
