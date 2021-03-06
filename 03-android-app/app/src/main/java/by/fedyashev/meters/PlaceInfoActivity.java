package by.fedyashev.meters;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import by.fedyashev.meters.entities.Consumer;
import by.fedyashev.meters.entities.Data;
import by.fedyashev.meters.entities.Meter;
import by.fedyashev.meters.entities.Place;

public class PlaceInfoActivity extends AppCompatActivity {

    //TextView tvId;
    TextView tvPlaceName;
    TextView tvConsumer;
    TextView tvMeterNumber;
    TextView tvIsSignNeed;
    TextView tvLastDate;
    TextView tvLastValue;

    Button btnPlaceAddData;

    Place place;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_place_info);

        initViews();
    }

    private void initViews() {
        //tvId = findViewById(R.id.tvId);
        tvPlaceName = findViewById(R.id.tvPlaceName);
        tvConsumer = findViewById(R.id.tvConsumer);
        tvMeterNumber = findViewById(R.id.tvMeterNumber);
        tvIsSignNeed = findViewById(R.id.tvIsSignNeed);
        tvLastDate = findViewById(R.id.tvLastDate);
        tvLastValue = findViewById(R.id.tvLastValue);

        btnPlaceAddData = findViewById(R.id.btnPlaceAddData);
        btnPlaceAddData.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(PlaceInfoActivity.this, PlaceAddDataActivity.class);
                intent.putExtra(Place.class.getCanonicalName(), place);
                startActivity(intent);
            }
        });

        place = (Place) getIntent().getSerializableExtra(Place.class.getCanonicalName());

        if (place != null) {
            Consumer consumer = place.getConsumer();
            Meter meter = place.getMeter();
            //tvId.setText(place.getId() + "");
            tvPlaceName.setText(place.getName());
            tvConsumer.setText(consumer != null ? consumer.getName() : "---");
            tvMeterNumber.setText(meter != null ? meter.getNumber() : "---");
            tvIsSignNeed.setText(place.isSignNeed() ? "Подпись - ДА" : "Подпись - НЕТ");

            Data lastData = meter != null ? meter.getLastData() : null;

            if (lastData != null) {
                tvLastDate.setText(android.text.format.DateFormat.format("dd.MM.yyyy HH:mm:ss", lastData.getDate()));
                tvLastValue.setText(lastData.getValue() + "");
            }
            else {
                tvLastDate.setText("---");
                tvLastValue.setText("---");
            }
        }
    }
}
