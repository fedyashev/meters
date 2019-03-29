package by.fedyashev.meters;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.widget.Toast;

import com.google.gson.Gson;

import java.io.IOException;
import java.util.List;

import by.fedyashev.meters.entities.Act01;
import by.fedyashev.meters.entities.Error;
import by.fedyashev.meters.entities.Place;
import by.fedyashev.meters.service.NetworkService;
import by.fedyashev.meters.storage.AppStorage;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class Act01ListActivity extends AppCompatActivity {

    RecyclerView rvAct01List;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_act01_list);
        initViews();
    }

    @Override
    protected void onResume() {
        super.onResume();
        fillRecyclerView();
    }

    private void fillRecyclerView() {
        String token = AppStorage
                .getInstance()
                .getUser()
                .getToken();

        NetworkService
                .getInstance()
                .getMeterApi()
                .getAct01List("BEARER " + token)
                .enqueue(new Callback<List<Act01>>() {
                    @Override
                    public void onResponse(Call<List<Act01>> call, Response<List<Act01>> response) {
                        if (response.isSuccessful()) {
                            List<Act01> acts = response.body();
                            if (acts != null) {
                                Act01ListRecyclerViewAdapter adapter = new Act01ListRecyclerViewAdapter(acts);
                                rvAct01List.setAdapter(adapter);
                            }
                        }
                        else {
                            Gson gson = new Gson();
                            try {
                                Error error = gson.fromJson(response.errorBody().string(), Error.class);
                                Toast.makeText(Act01ListActivity.this, error.getError().getCode() + " - " + error.getError().getMessage(), Toast.LENGTH_SHORT).show();
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        }
                    }

                    @Override
                    public void onFailure(Call<List<Act01>> call, Throwable t) {
                        Toast.makeText(Act01ListActivity.this, t.getMessage(), Toast.LENGTH_SHORT).show();
                        t.printStackTrace();
                    }
                });
    }

    private void initViews() {
        rvAct01List = findViewById(R.id.rvAct01List);
        LinearLayoutManager llm = new LinearLayoutManager(this);
        rvAct01List.setLayoutManager(llm);
    }
}
