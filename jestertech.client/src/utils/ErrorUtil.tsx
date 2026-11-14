import Button from "../components/ui/Button";

interface ErrorUtilProps {
    func: () => void;
    msg?: string;
}

function ErrorUtil({func, msg}: ErrorUtilProps ) {
  return (
    <div className="error-container">
        <div>
            <h3>{msg || "Error occurred. Try again later."}</h3>
            <Button
                className="errorBtn"
                type="button"
                onClick={() => func()}
                >
                Retry
            </Button>
        </div>
    </div>
  );
}

export default ErrorUtil;