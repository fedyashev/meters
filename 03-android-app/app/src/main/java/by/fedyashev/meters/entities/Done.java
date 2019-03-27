package by.fedyashev.meters.entities;

import com.google.gson.annotations.SerializedName;

public class Done {
    @SerializedName("done")
    boolean done;

    public Done(boolean done) {
        this.done = done;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }
}
