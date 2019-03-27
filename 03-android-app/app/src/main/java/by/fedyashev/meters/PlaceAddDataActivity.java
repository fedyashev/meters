package by.fedyashev.meters;

import android.content.res.Resources;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.CardView;
import android.util.DisplayMetrics;
import android.util.TypedValue;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.Gson;

import java.io.File;
import java.io.IOException;
import java.util.Date;

import by.fedyashev.meters.api.MetersApi;
import by.fedyashev.meters.entities.Act01;
import by.fedyashev.meters.entities.Consumer;
import by.fedyashev.meters.entities.Data;
import by.fedyashev.meters.entities.Done;
import by.fedyashev.meters.entities.Error;
import by.fedyashev.meters.entities.Meter;
import by.fedyashev.meters.entities.Place;
import by.fedyashev.meters.entities.Sign;
import by.fedyashev.meters.service.NetworkService;
import by.fedyashev.meters.storage.AppStorage;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class PlaceAddDataActivity extends AppCompatActivity {

    TextView tvPlaceName;
    TextView tvConsumer;
    TextView tvMeterNumber;
    TextView tvIsSignNeed;
    TextView tvLastDate;
    TextView tvLastValue;

    EditText etValue;

    Button btnClearSign;
    Button btnSendData;

    PaintView pvSign;
    CardView cardSign;

    Place place;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_place_add_data);

        initViews();
    }

    private void initViews() {
        tvPlaceName = findViewById(R.id.tvPlaceName);
        tvConsumer = findViewById(R.id.tvConsumer);
        tvMeterNumber = findViewById(R.id.tvMeterNumber);
        tvIsSignNeed = findViewById(R.id.tvIsSignNeed);
        tvLastDate = findViewById(R.id.tvLastDate);
        tvLastValue = findViewById(R.id.tvLastValue);

        etValue = findViewById(R.id.etValue);

        cardSign = findViewById(R.id.cardSign);
        pvSign = findViewById(R.id.pvSign);

        btnClearSign = findViewById(R.id.btnClearSign);
        btnSendData = findViewById(R.id.btnSendData);

        DisplayMetrics metrics = new DisplayMetrics();
        getWindowManager().getDefaultDisplay().getMetrics(metrics);
        pvSign.init(metrics);

//        float dip = 300f;
//        Resources r = getResources();
//        float px = TypedValue.applyDimension(
//                TypedValue.COMPLEX_UNIT_DIP,
//                dip,
//                r.getDisplayMetrics()
//        );
//        int size = (int) (dip * px);
//        pvSign.init(size, size);

        place = (Place) getIntent().getSerializableExtra(Place.class.getCanonicalName());

        if (place != null) {
            Consumer consumer = place.getConsumer();
            Meter meter = place.getMeter();
            tvPlaceName.setText(place.getName());
            tvConsumer.setText(consumer != null ? consumer.getName() : "---");
            tvMeterNumber.setText(meter != null ? meter.getNumber() : "---");
            tvIsSignNeed.setText(place.isSignNeed() ? "ДА" : "НЕТ");

            final Data lastData = meter != null ? meter.getLastData() : null;

            if (lastData != null) {
                tvLastDate.setText(android.text.format.DateFormat.format("dd.MM.yyyy HH:mm:ss", lastData.getDate()));
                tvLastValue.setText(Integer.toString(lastData.getValue()));
            } else {
                tvLastDate.setText("---");
                tvLastValue.setText("---");
            }

            if (!place.isSignNeed()) {
                cardSign.setVisibility(View.GONE);
            }

            btnClearSign.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    pvSign.clear();
                }
            });

            btnSendData.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {

                    if (place.getMeter() == null) {
                        Toast.makeText(PlaceAddDataActivity.this, "Невозможно создать отчет\nОтсутствует счетчик", Toast.LENGTH_SHORT).show();
                        return;
                    }

                    if (place.getConsumer() == null) {
                        Toast.makeText(PlaceAddDataActivity.this, "Невозможно создать отчет\nОтсутствует потребитель", Toast.LENGTH_SHORT).show();
                        return;
                    }

                    if (place.isSignNeed() && pvSign.isEmpty()) {
                        Toast.makeText(PlaceAddDataActivity.this, "Невозможно создать отчет\nОтсутствует подпись", Toast.LENGTH_SHORT).show();
                        return;
                    }

                    String rawValue = etValue.getText().toString();

                    if (rawValue == null || rawValue.isEmpty()) {
                        Toast.makeText(PlaceAddDataActivity.this, "Невозможно создать отчет\nНеобходимо записать показания", Toast.LENGTH_SHORT).show();
                        return;
                    }

                    int value = Integer.parseInt(etValue.getText().toString());
                    if (lastData != null && value < lastData.getValue()) {
                        Toast.makeText(PlaceAddDataActivity.this, "Невозможно создать отчет\nТекущие показания счетчика меньше предыдущих", Toast.LENGTH_SHORT).show();
                        return;
                    }

                    try {
                        File file = pvSign.getFile(PlaceAddDataActivity.this);
                        final RequestBody reqFile = RequestBody.create(MediaType.parse("image/png"), file);
                        MultipartBody.Part body = MultipartBody.Part.createFormData("sign", file.getName(), reqFile);

                        final String token = AppStorage
                                .getInstance()
                                .getUser()
                                .getToken();

                        final MetersApi api = NetworkService.getInstance().getMeterApi();

                        api.createSign("BEARER " + token, body).enqueue(new Callback<Sign>() {
                            @Override
                            public void onResponse(Call<Sign> call, Response<Sign> response) {
                                if (response.isSuccessful()) {
                                    Sign sign = response.body();

                                    if (sign != null) {

                                        String inspectorName = AppStorage.getInstance().getInspector().getName();
                                        String consumerName = place.getConsumer().getName();
                                        String placeName = place.getName();
                                        String meterNumber = place.getMeter().getNumber();
                                        int signId = sign.getId();
                                        Date currentDate = new Date();
                                        final String date = android.text.format.DateFormat.format("yyyy-MM-dd HH:mm:ss", currentDate).toString();
                                        int value = Integer.parseInt(etValue.getText().toString());

                                        api.createAct01("BEARER " + token, inspectorName, consumerName, placeName, meterNumber, signId, date, value).enqueue(new Callback<Act01>() {
                                            @Override
                                            public void onResponse(Call<Act01> call, Response<Act01> response) {
                                                if (response.isSuccessful()) {
                                                    Act01 act = response.body();
                                                    if (act != null) {

                                                        api.sendAct01EmailById("BEARER " + token, act.getId()).enqueue(new Callback<Done>() {
                                                            @Override
                                                            public void onResponse(Call<Done> call, Response<Done> response) {
                                                                if (response.isSuccessful()) {
                                                                    Done done = response.body();
                                                                    if (done != null && done.isDone()) {
                                                                        Toast.makeText(PlaceAddDataActivity.this, "Отчет создан и отправлен", Toast.LENGTH_SHORT).show();
                                                                        PlaceAddDataActivity.this.finish();
                                                                    } else {
                                                                        Toast.makeText(PlaceAddDataActivity.this, "Отчет создан, но не отправлен", Toast.LENGTH_SHORT).show();
                                                                    }
                                                                } else {
                                                                    Gson gson = new Gson();
                                                                    try {
                                                                        Error error = gson.fromJson(response.errorBody().string(), Error.class);
                                                                        Toast.makeText(PlaceAddDataActivity.this, "Отчет создан, но не отправлен\n" + error.getError().getCode() + " - " + error.getError().getMessage(), Toast.LENGTH_SHORT).show();
                                                                    } catch (IOException e) {
                                                                        e.printStackTrace();
                                                                    }
                                                                }
                                                            }

                                                            @Override
                                                            public void onFailure(Call<Done> call, Throwable t) {
                                                                Toast.makeText(PlaceAddDataActivity.this, "Отчет создан, но не отправлен\n" + t.getMessage(), Toast.LENGTH_SHORT).show();
                                                                t.printStackTrace();
                                                            }
                                                        });

                                                    } else {
                                                        Toast.makeText(PlaceAddDataActivity.this, "Отчет не создан", Toast.LENGTH_SHORT).show();
                                                    }
                                                } else {
                                                    Gson gson = new Gson();
                                                    try {
                                                        Error error = gson.fromJson(response.errorBody().string(), Error.class);
                                                        Toast.makeText(PlaceAddDataActivity.this, error.getError().getCode() + " - " + error.getError().getMessage(), Toast.LENGTH_SHORT).show();
                                                    } catch (IOException e) {
                                                        e.printStackTrace();
                                                    }
                                                }
                                            }

                                            @Override
                                            public void onFailure(Call<Act01> call, Throwable t) {
                                                Toast.makeText(PlaceAddDataActivity.this, t.getMessage(), Toast.LENGTH_SHORT).show();
                                                t.printStackTrace();
                                            }
                                        });

                                    } else {
                                        Toast.makeText(PlaceAddDataActivity.this, "Sing is null", Toast.LENGTH_SHORT).show();
                                    }
                                } else {
                                    Gson gson = new Gson();
                                    try {
                                        Error error = gson.fromJson(response.errorBody().string(), Error.class);
                                        Toast.makeText(PlaceAddDataActivity.this, error.getError().getCode() + " - " + error.getError().getMessage(), Toast.LENGTH_SHORT).show();
                                    } catch (IOException e) {
                                        e.printStackTrace();
                                    }
                                }
                            }

                            @Override
                            public void onFailure(Call<Sign> call, Throwable t) {
                                Toast.makeText(PlaceAddDataActivity.this, t.getMessage(), Toast.LENGTH_SHORT).show();
                                t.printStackTrace();
                            }
                        });

                    } catch (IOException e) {
                        e.printStackTrace();
                    }

                }
            });

        } else {
            Toast.makeText(PlaceAddDataActivity.this, "Место не найдено", Toast.LENGTH_SHORT).show();
        }
    }
}
