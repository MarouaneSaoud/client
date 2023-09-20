import axios from "axios";

async function config(values) {
    return await axios.post("http://154.144.247.110:3001/config", values  );
}

const Configuration = {config};

export default Configuration;