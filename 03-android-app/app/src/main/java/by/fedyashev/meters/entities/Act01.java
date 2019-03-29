package by.fedyashev.meters.entities;

import com.google.gson.annotations.SerializedName;

import java.util.Date;

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
    Date lastDate;

    @SerializedName("last_value")
    Float lastValue;

    @SerializedName("current_date")
    Date currentDate;

    @SerializedName("current_value")
    Float currentValue;

    @SerializedName("ConsumerSignId")
    int signId;

    public Act01(int id, Date date, String inspectorName, String consumerName, String placeName, String meterNumber, Date lastDate, Float lastValue, Date currentDate, Float currentValue, int signId) {
        this.id = id;
        this.date = date;
        this.inspectorName = inspectorName;
        this.consumerName = consumerName;
        this.placeName = placeName;
        this.meterNumber = meterNumber;
        this.lastDate = lastDate;
        this.lastValue = lastValue;
        this.currentDate = currentDate;
        this.currentValue = currentValue;
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

    public Date getLastDate() {
        return lastDate;
    }

    public void setLastDate(Date lastDate) {
        this.lastDate = lastDate;
    }

    public Float getLastValue() {
        return lastValue;
    }

    public void setLastValue(Float lastValue) {
        this.lastValue = lastValue;
    }

    public Date getCurrentDate() {
        return currentDate;
    }

    public void setCurrentDate(Date currentDate) {
        this.currentDate = currentDate;
    }

    public Float getCurrentValue() {
        return currentValue;
    }

    public void setCurrentValue(Float currentValue) {
        this.currentValue = currentValue;
    }

    public int getSignId() {
        return signId;
    }

    public void setSignId(int signId) {
        this.signId = signId;
    }
}
