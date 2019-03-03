package by.fedyashev.meters.entities;

import com.google.gson.annotations.SerializedName;

public class Meter {
    @SerializedName("id")
    private int id;

    @SerializedName("number")
    private String number;

    public Meter(int id, String number) {
        this.id = id;
        this.number = number;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }
}
