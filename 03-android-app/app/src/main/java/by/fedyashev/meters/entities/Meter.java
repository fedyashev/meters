package by.fedyashev.meters.entities;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class Meter implements Serializable {

    @SerializedName("id")
    private int id;

    @SerializedName("number")
    private String number;

    @SerializedName("lastData")
    private Data lastData;

    public Meter(int id, String number, Data lastData) {
        this.id = id;
        this.number = number;
        this.lastData = lastData;
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

    public Data getLastData() {
        return lastData;
    }

    public void setLastData(Data lastData) {
        this.lastData = lastData;
    }
}
