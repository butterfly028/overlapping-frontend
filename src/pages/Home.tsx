import React from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const API_URL = "http://localhost:5000/api/v1/overlapping";

const Home: React.FC = () => {
  const [result, setResult] = React.useState<number>(0);
  const [src, setSrc] = React.useState<string>("");
  const [pattern, setPattern] = React.useState<string>("");
  const [duplicateStr, setDuplicateStr] = React.useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_URL, {
        data: {
          src,
          pattern,
        },
      });
      setResult(res.data.overlappingCnt);
      setDuplicateStr(res.data.duplicateStr);
      alert("Api call was successful");
    } catch (err) {
      alert(`An error occured ${err}`);
    }
  };

  return (
    <React.Fragment>
      <h1>
        Overlapping Characters: "{duplicateStr}" Counts: {result}
      </h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Source String"
          value={src}
          onChange={(e) => {
            setSrc(e.currentTarget.value);
          }}
        />
        <TextField
          label="Pattern"
          value={pattern}
          onChange={(e) => {
            setPattern(e.currentTarget.value);
          }}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </React.Fragment>
  );
};

export default Home;
