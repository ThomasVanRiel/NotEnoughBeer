const ctx = document.getElementById('myChart').getContext('2d');

const data = {
    default: {
        h: [ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16,
            17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
            34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
            51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67,
            68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84,
            85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99],
        r: [20. , 20.2, 20.4, 20.6, 20.8, 21. , 21.2, 21.4, 21.6, 21.8, 22. ,
            22.2, 22.4, 22.6, 22.8, 23. , 23.2, 23.4, 23.6, 23.8, 24. , 24.2,
            24.4, 24.6, 24.8, 25. , 25.2, 25.4, 25.6, 25.8, 26. , 26.2, 26.4,
            26.6, 26.8, 27. , 27.2, 27.4, 27.6, 27.8, 28. , 28.2, 28.4, 28.6,
            28.8, 29. , 29.2, 29.4, 29.6, 29.8, 30. , 30.2, 30.4, 30.6, 30.8,
            31. , 31.2, 31.4, 31.6, 31.8, 32. , 32.2, 32.4, 32.6, 32.8, 33. ,
            33.2, 33.4, 33.6, 33.8, 34. , 34.2, 34.4, 34.6, 34.8, 35. , 35.2,
            35.4, 35.6, 35.8, 36. , 36.2, 36.4, 36.6, 36.8, 37. , 37.2, 37.4,
            37.6, 37.8, 38. , 38.2, 38.4, 38.6, 38.8, 39. , 39.2, 39.4, 39.6,
            39.8, 40.],
        v: [0.,   4.,   8.,  12.,  16.,  20.,  24.,  28.,  32.,  36.,  40.,
            44.,  48.,  52.,  56.,  60.,  64.,  68.,  72.,  76.,  80.,  84.,
            88.,  92.,  96., 100., 104., 108., 112., 116., 120., 124., 128.,
           132., 136., 140., 144., 148., 152., 156., 160., 164., 168., 172.,
           176., 180., 184., 188., 192., 196., 200., 204., 208., 212., 216.,
           220., 224., 228., 232., 236., 240., 244., 248., 252., 256., 260.,
           264., 268., 272., 276., 280., 284., 288., 292., 296., 300., 304.,
           308., 312., 316., 320., 324., 328., 332., 336., 340., 344., 348.,
           352., 356., 360., 364., 368., 372., 376., 380., 384., 388., 392.,
           396., 400. ],
        fill: [80]
    }
}

fill = data.default.fill
selection = 'default'
const elemVolume = document.querySelector('#volume')

const labels = data.default.h;
const dataInit = {
    labels: labels,
    datasets: [{
        label: 'Outline',
        data: data.default.r,
        borderColor: 'black',
        tension: 0.2,
        fill: false
    },{
        label: 'Outline-',
        data: data.default.r.map(function(e){return e*-1}),
        borderColor: 'black',
        tension: 0.2,
        fill: false
    },{
        label: 'Fill',
        data:  data.default.r.map(function(e,i){
            if (data.default.h[i] <= fill){
                return e;
            }
            else{
                return NaN;
            }
        }),
        borderColor: 'black',
        showLine: false,
        tension: 0.1,
        fill: {value: 0}
    },{
        label: 'Fill-',
        data:  data.default.r.map(function(e,i){
            if (data.default.h[i] <= fill){
                return -e;
            }
            else {
                return NaN;
            }
        }),
        borderColor: 'black',
        showLine: false,
        tension: 0.1,
        fill: {value: 0}
    }]
};

const config = {
    type: 'line',
    data: dataInit,
    options: {
        layout:{autoPadding: false},
        indexAxis: 'y',
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
                max: 200
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

            volume = data[selection].v[dataY]
            volpct = volume/330*100
            elemVolume.innerHTML = volume.toFixed(0) + " ml (" + volpct.toFixed(0) + "%)"
            fill = dataY;

            // update fill
            myChart.data.datasets[2].data = data[selection].r.map(function(e,i){
                if (data[selection].h[i] <= fill){
                    return e;
                }
                else {
                    return NaN;
                }
            });
            myChart.data.datasets[3].data = data[selection].r.map(function(e,i){
                if (data[selection].h[i] <= fill){
                    return -e;
                }
                else {
                    return NaN;
                }
            });

            myChart.update('none');
        }   
    }
};

const myChart = new Chart(ctx, config);