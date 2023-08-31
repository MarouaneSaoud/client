import axios from "axios";

async function config(values) {
    return await axios.post("http://196.64.8.137:3001/config", values  );
}

const Configuration = {config};

export default Configuration;