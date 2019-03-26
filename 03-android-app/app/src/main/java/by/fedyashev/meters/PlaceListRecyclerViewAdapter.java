package by.fedyashev.meters;

import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.List;

import by.fedyashev.meters.entities.Consumer;
import by.fedyashev.meters.entities.Data;
import by.fedyashev.meters.entities.Meter;
import by.fedyashev.meters.entities.Place;

public class PlaceListRecyclerViewAdapter extends RecyclerView.Adapter<PlaceListRecyclerViewAdapter.PlaceViewHolder> {

    static final String PLACE_TAG = "PLACE";

    public static class PlaceViewHolder extends RecyclerView.ViewHolder {

        //TextView tvId;
        TextView tvPlaceName;
        TextView tvConsumer;
        TextView tvMeterNumber;
        TextView tvIsSingNeed;
        TextView tvLastDate;
        TextView tvLastValue;

        CardView cardPlace;

        public PlaceViewHolder(@NonNull View itemView) {
            super(itemView);

            //tvId = itemView.findViewById(R.id.tvId);
            tvPlaceName = itemView.findViewById(R.id.tvPlaceName);
            tvConsumer = itemView.findViewById(R.id.tvConsumer);
            tvMeterNumber = itemView.findViewById(R.id.tvMeterNumber);
            tvIsSingNeed = itemView.findViewById(R.id.tvIsSignNeed);
            tvLastDate = itemView.findViewById(R.id.tvLastDate);
            tvLastValue = itemView.findViewById(R.id.tvLastValue);

            cardPlace = itemView.findViewById(R.id.cardPlace);
        }
    }

    List<Place> places;

    public PlaceListRecyclerViewAdapter(List<Place> places) {
        this.places = places;
    }

    @NonNull
    @Override
    public PlaceViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
        View v = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.item_place, viewGroup, false);
        PlaceViewHolder pvh = new PlaceViewHolder(v);
        return pvh;
    }

    @Override
    public void onBindViewHolder(@NonNull PlaceViewHolder placeViewHolder, int i) {
        final Place place = places.get(i);
        if (place != null) {

            Consumer consumer = place.getConsumer();
            Meter meter = place.getMeter();

            //placeViewHolder.tvId.setText(place.getId() + "");
            placeViewHolder.tvPlaceName.setText(place.getName());
            placeViewHolder.tvConsumer.setText(consumer != null ? consumer.getName() : "---");
            placeViewHolder.tvMeterNumber.setText(meter != null ? meter.getNumber() : "---");
            placeViewHolder.tvIsSingNeed.setText(place.isSignNeed() ? "ДА" : "НЕТ");

            Data lastData = meter != null ? meter.getLastData() : null;

            if (lastData != null) {
                placeViewHolder.tvLastDate.setText(android.text.format.DateFormat.format("dd.MM.yyyy HH:mm:ss", lastData.getDate()));
                placeViewHolder.tvLastValue.setText(Integer.toString(lastData.getValue()));
            } else {
                placeViewHolder.tvLastDate.setText("---");
                placeViewHolder.tvLastValue.setText("---");
            }

            placeViewHolder.cardPlace.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    //Intent intent = new Intent(v.getContext(), PlaceInfoActivity.class);
                    Intent intent = new Intent(v.getContext(), PlaceAddDataActivity.class);
                    intent.putExtra(Place.class.getCanonicalName(), place);
                    v.getContext().startActivity(intent);
                }
            });

        }
    }

    @Override
    public int getItemCount() {
        return places.size();
    }


}
