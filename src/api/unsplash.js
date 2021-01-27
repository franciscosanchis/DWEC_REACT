import axios from "axios";

const accessKey = "0axPNKu1rrEXR-k_Pg2Zx28a-KFQRu_SSWYyccQvT68";

//https://unsplash.com/documentation#search-photos
export default axios.create({
  headers: { Authorization: "Client-ID " + accessKey },
  baseURL: "https://api.unsplash.com"
});
