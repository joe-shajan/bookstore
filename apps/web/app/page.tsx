import { axios } from "../lib/axios";

export default async function Page(): Promise<JSX.Element> {
  const response = await axios.get("/");
  console.log(response.data);

  return <div className="text-5xl">{response.data.message}</div>;
}
