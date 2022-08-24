const ctx = document.getElementById('myChart').getContext('2d');



fill = data.godis.fill;
selection = 'godis';
const elemVolume = document.querySelector('#volume');
const elemMenu = document.querySelector('#menu');
const elemHeader = document.getElementById('header');

const dataInit = {
    labels: labels,
    datasets: [{
        label: 'Outline',
        data: data[selection].o,
        borderColor: 'black',
        tension: 0.2,
        fill: false
    },{
        label: 'Outline-',
        data: data[selection].o.map(function(e){return e*-1}),
        borderColor: 'black',
        tension: 0.2,
        fill: false
    },{
        label: 'Fill',
        data:  data[selection].i.map(function(e,i){
            if (labels[i] <= fill){
                return e;
            }
            else{
                return NaN;
            }
        }),
        backgroundColor: data[selection].color,
        showLine: false,
        tension: 0.1,
        fill: {value: -1}
    },{
        label: 'Fill-',
        data:  data[selection].i.map(function(e,i){
            if (labels[i] <= fill){
                return -e;
            }
            else {
                return NaN;
            }
        }),
        backgroundColor: data[selection].color,
        showLine: false,
        tension: 0.1,
        fill: {value: 1}
    }]
};

const config = {
    type: 'line',
    data: dataInit,
    options: {
        layout:{autoPadding: false},
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 16/25,
        interaction: {
            mode: 'y'
        },
        elements:{
            point:{
                radius:0
            }
        },
        scales: {
            x: {
                display: false,
                min: -80,
                max: 80
            },
            y: {
                display: false,
                reverse: true,
                min: 0,
                max: 250
            }

        },
        plugins:{
            legend:{
                display:false
            }
        },
        onHover: (e) => {
            const canvasPosition = Chart.helpers.getRelativePosition(e, chart);

            // Substitute the appropriate scale IDs
            const dataY = myChart.scales.y.getValueForPixel(canvasPosition.y);

            volume = data[selection].v[dataY];
            if (!isNaN(volume)) {
                volmax = data[selection].v[data[selection].fill];
                console.log(volmax);
                volpct = volume/volmax*100
                elemVolume.innerHTML = volume.toFixed(0) + " ml left (" + volpct.toFixed(0) + "%)"
                fill = dataY;

                // update fill
                myChart.data.datasets[2].data = data[selection].i.map(function(e,i){
                    if (labels[i] <= fill){
                        return e;
                    }
                    else {
                        return NaN;
                    }
                });
                myChart.data.datasets[3].data = data[selection].i.map(function(e,i){
                    if (labels[i] <= fill){
                        return -e;
                    }
                    else {
                        return NaN;
                    }
                });
            }

            myChart.update('none');
        }   
    }
};

const myChart = new Chart(ctx, config);

function reloadData(){
    myChart.data.datasets = [{
        label: 'Outline',
        data: data[selection].o,
        borderColor: 'black',
        tension: 0.2,
        fill: false
    },{
        label: 'Outline-',
        data: data[selection].o.map(function(e){return e*-1}),
        borderColor: 'black',
        tension: 0.2,
        fill: false
    },{
        label: 'Fill',
        data:  data[selection].i.map(function(e,i){
            if (labels[i] <= fill){
                return e;
            }
            else{
                return NaN;
            }
        }),
        backgroundColor: data[selection].color,
        showLine: false,
        tension: 0.1,
        fill: {value: 0}
    },{
        label: 'Fill-',
        data:  data[selection].i.map(function(e,i){
            if (labels[i] <= fill){
                return -e;
            }
            else {
                return NaN;
            }
        }),
        backgroundColor: data[selection].color,
        showLine: false,
        tension: 0.1,
        fill: {value: 0}
    }]
    myChart.update('none');
}

function changeGlass(glass){
    selection = glass;
    fill = data[selection].fill;
    volume = data[selection].v[fill]
    reloadData();
    elemVolume.innerHTML = volume.toFixed(0) + " ml left (100%)";
    elemVolume.style.color = data[selection].color;
    elemHeader.style.backgroundColor = data[selection].color;
}

for (const [k, v] of Object.entries(data)) {
    btn = document.createElement('button')
    btn.onclick = function() { changeGlass(k); };
    btn.textContent = v.name;
    btn.style = 'background-color: ' + v.color + ';';
    elemMenu.appendChild(btn);
}