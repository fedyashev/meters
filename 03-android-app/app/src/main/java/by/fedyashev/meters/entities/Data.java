package by.fedyashev.meters.entities;

import com.google.gson.annotations.SerializedName;

import java.util.Date;

public class Data {

    @SerializedName("id")
    private int id;

    @SerializedName("date")
    private Date date;

    @SerializedName("value")
    private int value;

    public Data(int id, Date date, int value) {
        this.id = id;
        this.date = date;
        this.value = value;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }
}
