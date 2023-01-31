import './App.css';
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, S3 } from "@aws-sdk/client-s3";


function App() {

  const upload = (file) => {
    
    var file = file.target.files[0];

    const target= { Bucket:"andybucket12", Key:file.name, Body:file };
    const creds = {accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY, secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY}
    
try {
  const parallelUploads3 = new Upload({
    client: new S3Client({region:"awsregion", credentials: creds}),
    leavePartsOnError: false, // optional manually handle dropped parts
    params: target,
  });

  parallelUploads3.on("httpUploadProgress", (progress) => {
    console.log(progress);
  });

   parallelUploads3.done();
}


catch (e) {
  console.log(e);
}
  }

  return (
    <>
    <form onClick={() => document.querySelector(".input-field").click()}>
    <input type="file" onChange={upload} className="input-field" />
    </form>
    </>
  );
}

export default App;





