package by.fedyashev.meters;

import android.support.annotation.NonNull;
import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.Date;
import java.util.List;

import by.fedyashev.meters.entities.Act01;

public class Act01ListRecyclerViewAdapter extends RecyclerView.Adapter<Act01ListRecyclerViewAdapter.Act01ViewHolder> {

    public static class Act01ViewHolder extends RecyclerView.ViewHolder {

        CardView cardAct01;

        TextView tvInspector;
        TextView tvConsumer;
        TextView tvPlace;
        TextView tvMeter;
        TextView tvLastDate;
        TextView tvLastValue;
        TextView tvCurrentDate;
        TextView tvCurrentValue;
        TextView tvConsumption;

        public Act01ViewHolder(@NonNull View itemView) {
            super(itemView);

            cardAct01 = itemView.findViewById(R.id.cardAct01);
            tvInspector = itemView.findViewById(R.id.tvInspector);
            tvConsumer = itemView.findViewById(R.id.tvConsumer);
            tvPlace = itemView.findViewById(R.id.tvPlace);
            tvMeter = itemView.findViewById(R.id.tvMeter);
            tvLastDate = itemView.findViewById(R.id.tvLastDate);
            tvLastValue = itemView.findViewById(R.id.tvLastValue);
            tvCurrentDate = itemView.findViewById(R.id.tvCurrentDate);
            tvCurrentValue = itemView.findViewById(R.id.tvCurrentValue);
            tvConsumption = itemView.findViewById(R.id.tvConsumption);
        }
    }

    List<Act01> acts;

    public Act01ListRecyclerViewAdapter(List<Act01> acts) {
        this.acts = acts;
    }

    @NonNull
    @Override
    public Act01ViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
        View v = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.item_act01, viewGroup, false);
        Act01ViewHolder vh = new Act01ViewHolder(v);
        return vh;
    }

    @Override
    public void onBindViewHolder(@NonNull Act01ViewHolder act01ViewHolder, int i) {
        Act01 act = acts.get(i);
        if (act != null) {
            String inspectorName = act.getInspectorName();
            String consumerName = act.getConsumerName();
            String meterNumber = act.getMeterNumber();
            String placeName = act.getPlaceName();
            Date lastDate = act.getLastDate();
            Float lastValue = act.getLastValue();
            Date currentDate = act.getCurrentDate();
            Float currentValue = act.getCurrentValue();

            act01ViewHolder.tvInspector.setText(inspectorName != null ? inspectorName : "---");
            act01ViewHolder.tvConsumer.setText(consumerName != null ? consumerName : "---");
            act01ViewHolder.tvPlace.setText(placeName != null ? placeName : "---");
            act01ViewHolder.tvMeter.setText(meterNumber != null ? meterNumber : "---");

            String lastDateStr = lastDate != null ? android.text.format.DateFormat.format("dd.MM.yyyy HH:mm:ss", lastDate).toString() : "---";
            act01ViewHolder.tvLastDate.setText(lastDateStr);
            act01ViewHolder.tvLastValue.setText(lastValue != null ? lastValue.toString() : "---");

            String currentDateStr = currentDate != null ? android.text.format.DateFormat.format("dd.MM.yyyy HH:mm:ss", currentDate).toString() : "---";
            act01ViewHolder.tvCurrentDate.setText(currentDateStr);
            act01ViewHolder.tvCurrentValue.setText(currentValue != null ? currentValue.toString() : "---");

            String consumption = "---";
            if (lastValue != null && currentValue != null) {
                consumption = Float.toString(currentValue - lastValue);
            } else if (currentValue != null) {
                consumption = currentValue.toString();
            } else if (lastValue != null) {
                consumption = lastValue.toString();
            }
            act01ViewHolder.tvConsumption.setText(consumption);
        }
    }

    @Override
    public int getItemCount() {
        return acts.size();
    }
}
