package by.fedyashev.meters;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.widget.TextView;
import android.widget.Toast;

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

public class PlaceListActivity extends AppCompatActivity {

    TextView tvInfo;
    RecyclerView rvPlaceList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_place_list);

        initView();
    }

    private void initView() {

        tvInfo = this.findViewById(R.id.tvInfo);

        rvPlaceList = this.findViewById(R.id.rvPlaceList);
        LinearLayoutManager llm = new LinearLayoutManager(this);
        rvPlaceList.setLayoutManager(llm);

        final PlaceListActivity context = this;

        User user = AppStorage
                .getInstance()
                .getUser();

        if (user != null) {
            NetworkService
                    .getInstance()
                    .getMeterApi()
                    .getPlaceList("BEARER " + user.getToken())
                    .enqueue(new Callback<List<Place>>() {
                        @Override
                        public void onResponse(Call<List<Place>> call, Response<List<Place>> response) {
                            if (response.isSuccessful()) {
                                List<Place> places = response.body();
                                if (places != null) {
                                    PlaceListRecyclerViewAdapter adapter = new PlaceListRecyclerViewAdapter(places);
                                    rvPlaceList.setAdapter(adapter);
                                }
                            }
                            else {
                                Gson gson = new Gson();
                                try {
                                    Error error = gson.fromJson(response.errorBody().string(), Error.class);
                                    Toast.makeText(context, error.getError().getCode() + " - " + error.getError().getMessage(), Toast.LENGTH_SHORT).show();
                                } catch (IOException e) {
                                    e.printStackTrace();
                                }
                            }
                        }

                        @Override
                        public void onFailure(Call<List<Place>> call, Throwable t) {
                            Toast.makeText(PlaceListActivity.this, t.getMessage(), Toast.LENGTH_SHORT).show();
                            t.printStackTrace();
                        }
                    });
        }
    }
}
