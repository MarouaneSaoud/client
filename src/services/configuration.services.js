import axios from "axios";

async function config(values) {
    return await axios.post("http://localhost:3001/config", values  );
}

const Configuration = {config};

export default Configuration;