export interface WelcomeScreenProps {
  handleUploadFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUseMockData: () => void;
  uploadSuccessful: boolean;
}
