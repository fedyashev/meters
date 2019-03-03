package by.fedyashev.meters.entities;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Error {

    public class ErrorBody {
        @SerializedName("code")
        private int code;

        @SerializedName("message")
        private String message;

        public ErrorBody(int code, String message) {
            this.code = code;
            this.message = message;
        }

        public int getCode() {
            return code;
        }

        public void setCode(int code) {
            this.code = code;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

    @SerializedName("error")
    private ErrorBody error;

    public Error(ErrorBody error) {
        this.error = error;
    }

    public ErrorBody getError() {
        return error;
    }

    public void setError(ErrorBody error) {
        this.error = error;
    }
}
