package by.fedyashev.meters.entities;

import com.google.gson.annotations.SerializedName;

import java.util.Date;

/*
{
    "id":10,
    "date":"2019-03-27T19:56:37.000Z",
    "inspector":"Прохоров",
    "consumer":"ИП Романов",
    "place":"Ролет Х1",
    "meter":"010",
    "last_date":"2019-03-10T12:50:06.000Z",
    "last_value":0,
    "current_date":"2019-03-27T19:56:37.000Z",
    "current_value":18,
    "createdAt":"2019-03-27T19:56:51.000Z",
    "updatedAt":"2019-03-27T19:56:51.000Z",
    "ConsumerSignId":18
}
*/
public class Act01 {
    @SerializedName("id")
    int id;

    @SerializedName("date")
    Date date;

    @SerializedName("inspector")
    String inspectorName;

    @SerializedName("consumer")
    String consumerName;

    @SerializedName("place")
    String placeName;

    @SerializedName("meter")
    String meterNumber;

    @SerializedName("last_date")
    Date last_date;

    @SerializedName("last_value")
    int last_value;

    @SerializedName("current_date")
    Date current_date;

    @SerializedName("current_value")
    int current_value;

    @SerializedName("ConsumerSignId")
    int signId;

    public Act01(int id, Date date, String inspectorName, String consumerName, String placeName, String meterNumber, Date last_date, int last_value, Date current_date, int current_value, int signId) {
        this.id = id;
        this.date = date;
        this.inspectorName = inspectorName;
        this.consumerName = consumerName;
        this.placeName = placeName;
        this.meterNumber = meterNumber;
        this.last_date = last_date;
        this.last_value = last_value;
        this.current_date = current_date;
        this.current_value = current_value;
        this.signId = signId;
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

    public String getInspectorName() {
        return inspectorName;
    }

    public void setInspectorName(String inspectorName) {
        this.inspectorName = inspectorName;
    }

    public String getConsumerName() {
        return consumerName;
    }

    public void setConsumerName(String consumerName) {
        this.consumerName = consumerName;
    }

    public String getPlaceName() {
        return placeName;
    }

    public void setPlaceName(String placeName) {
        this.placeName = placeName;
    }

    public String getMeterNumber() {
        return meterNumber;
    }

    public void setMeterNumber(String meterNumber) {
        this.meterNumber = meterNumber;
    }

    public Date getLast_date() {
        return last_date;
    }

    public void setLast_date(Date last_date) {
        this.last_date = last_date;
    }

    public int getLast_value() {
        return last_value;
    }

    public void setLast_value(int last_value) {
        this.last_value = last_value;
    }

    public Date getCurrent_date() {
        return current_date;
    }

    public void setCurrent_date(Date current_date) {
        this.current_date = current_date;
    }

    public int getCurrent_value() {
        return current_value;
    }

    public void setCurrent_value(int current_value) {
        this.current_value = current_value;
    }

    public int getSignId() {
        return signId;
    }

    public void setSignId(int signId) {
        this.signId = signId;
    }
}
