import { WelcomeScreenProps } from "../../types/strongAppAnalytics.types";

import Icon from "./../Icon/Icon";
import UploadBtn from "./../UploadBtn/UploadBtn";

import "./WelcomeScreen.css";

const WelcomeScreen = ({
  uploadSuccessful,
  handleUploadFile,
  handleUseMockData,
}: WelcomeScreenProps) => {
  return (
    <>
      <h1>
        Custom simple analytics App for{" "}
        <a target=" _blank" href="https://www.strong.app/">
          Strong-app
          <sup>
            <Icon icon="newTab" />
          </sup>
        </a>{" "}
        data
      </h1>
      <h2>Welcome !</h2>
      <p>
        This is a very lightweight and straightforward web app. You can either{" "}
        <UploadBtn
          defaultLabel={"upload"}
          isSuccessfulUpload={uploadSuccessful}
          onChangeFunction={handleUploadFile}
          className="input--style-text"
          keepLabel
        />{" "}
        your exported .csv file to see your own data, or you can use the{" "}
        <button onClick={handleUseMockData} className="text-button">
          mock data
        </button>
        .<br />I made this because I kept forgetting when was the last time I
        raised my weights for a given excercise or how long I'd been using the
        same weight.
      </p>
      <p>This simple web app is using react-calendar, papa parse and ChartJS</p>
    </>
  );
};

export default WelcomeScreen;
