import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

function App() {
  const [name, setName] = useState("");
  const [ipData, setIpData] = useState({});
  const [boo, setBoo] = useState(true);
  const supabase = createClient(
    "https://jxbtrmuowdrxovuexzcr.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4YnRybXVvd2RyeG92dWV4emNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA0OTgzMjgsImV4cCI6MjAxNjA3NDMyOH0.V4-eGgftfCa7cgTAJaB5picb7elBlVOt49pqoV3OKP8"
  );

  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch("https://ipapi.co/json")
      .then((response) => response.json())
      .then((data) => {
        setIpData(data);
      });
  }, []);

  const submitName = () => {
    console.log(name);
    if (name.trim() === "") {
      alert("Please enter a valid name");
      return;
    }
    addUser()
    setBoo(false);
  };

  // async function getUser() {
  //   const { data } = await supabase.from("users").select();
  //   console.log(data);
  //   setUser(data);
  // }

  const addUser = () => {
    supabase
      .from("users")
      .insert([
        {
          name: name,
          ip: ipData.ip,
          network: ipData.network,
          version: ipData.version,
          city: ipData.city,
          region: ipData.region,
          region_code: ipData.region_code,
          country: ipData.country,
          country_name: ipData.country_name,
          country_code: ipData.country_code,
          country_code_iso3: ipData.country_code_iso3,
          country_capital: ipData.country_capital,
          country_tld: ipData.country_tld,
          postal: ipData.postal,
          latitude: ipData.latitude,
          longitude: ipData.longitude,
          timezone: ipData.timezone,
          utc_offset: ipData.utc_offset,
          country_calling_code: ipData.country_calling_code,
          currency: ipData.currency,
          currency_name: ipData.currency_name,
          languages: ipData.languages,
          country_area: ipData.country_area,
          country_population: ipData.country_population,
          asn: ipData.asn,
          org: ipData.org,
        },
      ])
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <>
      <div className="container-l flex-col">
        <div className={`boo cont ${boo ? "block" : "hidden"}`}>
          <h1 className="text-3xl font-semibold">
            Hello Fellow Student Welcome to <br />
            BILL
          </h1>
          <input
            type="text"
            placeholder="What is your name?"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={submitName}>Submit</button>
        </div>

        <div className={`bam cont ${boo ? "hidden" : "block"}`} id="bamDiv">
          <h1 className="text-3xl font-semibold">Get Bamboozled BOZO</h1>
          <ul>
            {Object.entries(ipData).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
