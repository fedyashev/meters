package by.fedyashev.meters;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.util.SparseArray;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.vision.CameraSource;
import com.google.android.gms.vision.Detector;
import com.google.android.gms.vision.barcode.Barcode;
import com.google.android.gms.vision.barcode.BarcodeDetector;
import com.google.gson.Gson;

import java.io.IOException;
import java.util.List;

import by.fedyashev.meters.entities.Error;
import by.fedyashev.meters.entities.Place;
import by.fedyashev.meters.entities.User;
import by.fedyashev.meters.service.NetworkService;
import by.fedyashev.meters.storage.AppStorage;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class QrScanner extends AppCompatActivity {

    SurfaceView surfaceView;
    TextView txtBarcodeValue;
    private BarcodeDetector barcodeDetector;
    private CameraSource cameraSource;
    private static final int REQUEST_CAMERA_PERMISSION = 201;
    Button btnAction;
    String intentData = "";

    Place place = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_qr_scanner);

        initViews();
    }

    private void initViews() {
        txtBarcodeValue = findViewById(R.id.txtBarcodeValue);
        surfaceView = findViewById(R.id.surfaceView);
        btnAction = findViewById(R.id.btnAction);

        btnAction.setVisibility(View.GONE);

        btnAction.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (place != null) {
                    Intent intent = new Intent(QrScanner.this, PlaceAddDataActivity.class);
                    intent.putExtra(Place.class.getCanonicalName(), place);
                    startActivity(intent);
                }
            }
        });
    }

    private void initialiseDetectorsAndSources() {

        Toast.makeText(getApplicationContext(), "Сканер запущен", Toast.LENGTH_SHORT).show();

        barcodeDetector = new BarcodeDetector.Builder(this)
                .setBarcodeFormats(Barcode.QR_CODE)
                .build();

        cameraSource = new CameraSource.Builder(this, barcodeDetector)
                .setRequestedPreviewSize(1920, 1080)
                .setAutoFocusEnabled(true) //you should add this feature
                .build();

        surfaceView.getHolder().addCallback(new SurfaceHolder.Callback() {
            @Override
            public void surfaceCreated(SurfaceHolder holder) {
                try {
                    if (ActivityCompat.checkSelfPermission(QrScanner.this, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED) {
                        cameraSource.start(surfaceView.getHolder());
                    } else {
                        ActivityCompat.requestPermissions(QrScanner.this, new
                                String[]{Manifest.permission.CAMERA}, REQUEST_CAMERA_PERMISSION);
                    }

                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            @Override
            public void surfaceChanged(SurfaceHolder holder, int format, int width, int height) {
            }

            @Override
            public void surfaceDestroyed(SurfaceHolder holder) {
                cameraSource.stop();
            }
        });


        barcodeDetector.setProcessor(new Detector.Processor<Barcode>() {
            @Override
            public void release() {
                //Toast.makeText(getApplicationContext(), "To prevent memory leaks barcode scanner has been stopped", Toast.LENGTH_SHORT).show();
                Toast.makeText(getApplicationContext(), "Сканер остановлен", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void receiveDetections(Detector.Detections<Barcode> detections) {
                final SparseArray<Barcode> barcodes = detections.getDetectedItems();
                if (barcodes.size() != 0) {

                    txtBarcodeValue.post(new Runnable() {

                        @Override
                        public void run() {
                            final String barcodeData = barcodes.valueAt(0).displayValue;
                            if (barcodeData.matches("^\\d+$")) {
                                if (!intentData.equalsIgnoreCase(barcodeData)) {
                                    intentData = barcodeData;

                                    User user = AppStorage
                                            .getInstance()
                                            .getUser();

                                    String token = user != null ? user.getToken() : "";

                                    NetworkService
                                            .getInstance()
                                            .getMeterApi()
                                            .getPlaceByMeterNumber("BEARER " + token, barcodeData)
                                            .enqueue(new Callback<Place>() {
                                                @Override
                                                public void onResponse(Call<Place> call, Response<Place> response) {
                                                    if (response.isSuccessful()) {
                                                        Place p = response.body();
                                                        if (p != null) {
                                                            place = p;
                                                            btnAction.setVisibility(View.VISIBLE);
                                                            txtBarcodeValue.setText("Счетчик №" + barcodeData);
                                                        }
                                                    }
                                                    else {
                                                        Gson gson = new Gson();
                                                        place = null;
                                                        btnAction.setVisibility(View.GONE);
                                                        txtBarcodeValue.setText("Не найден счетчик или место");
                                                        try {
                                                            Error error = gson.fromJson(response.errorBody().string(), Error.class);
                                                            Toast.makeText(QrScanner.this, error.getError().getCode() + " - " + error.getError().getMessage(), Toast.LENGTH_SHORT).show();
                                                        } catch (IOException e) {
                                                            e.printStackTrace();
                                                        }
                                                    }
                                                }

                                                @Override
                                                public void onFailure(Call<Place> call, Throwable t) {
                                                    place = null;
                                                    btnAction.setVisibility(View.GONE);
                                                    txtBarcodeValue.setText("Не найден счетчик или место");
                                                    Toast.makeText(QrScanner.this, t.getMessage(), Toast.LENGTH_SHORT).show();
                                                    t.printStackTrace();
                                                }
                                            });
                                }
                            } else {
                                btnAction.setVisibility(View.GONE);
                                txtBarcodeValue.setText("Номер счетчика\nне найден");
                            }
                        }
                    });

                }
            }
        });
    }


    @Override
    protected void onPause() {
        super.onPause();
        cameraSource.release();
    }

    @Override
    protected void onResume() {
        super.onResume();
        initialiseDetectorsAndSources();
    }
}

