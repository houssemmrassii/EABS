/* type Props = {}; */

import { Button, Result } from "antd";

const NotFound = (/* props: Props */) => {
  const Navigate = useNavigate();

  const handleBackHome = () => {
    Navigate("/dashboard");
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Result
        status="404"
        title="Page introuvable"
        subTitle="Désolé, la page que vous avez visitée n'existe pas."
        extra={
          <Button type="primary" onClick={handleBackHome}>
            Retour à l'accueil
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
