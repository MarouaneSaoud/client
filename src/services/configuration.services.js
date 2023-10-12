import axios from "axios";

async function config(values) {
    return await axios.post("http://38.242.222.233:3001/config", values  );
}

const Configuration = {config};

export default Configuration;