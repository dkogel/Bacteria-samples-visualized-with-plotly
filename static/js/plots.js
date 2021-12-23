// much of this code taken from Dom's Office Hours 12/11/21

console.log("this is plots.js")


function DrawGaugechart(sampleId){
    d3.json('../../samples.json').then(data =>
    {
        let metaData = data.metadata;
        let resultArray = metaData.filter(m => m.id == sampleId);
        let result = resultArray[0];
        let wfreq = result.wfreq
        console.log(`wfreq gauge: ${wfreq}`)


        let gauge_data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: wfreq,
                title: { text: "Wash Frequency per Week" },
                type: "indicator",
                mode: "gauge+number", 
                gauge: {   
                    axis: { range: [null, 9] },
                    bar: { color: "darkblue" },
                    steps: [
                    { range: [0, 1], color: "#ffffff" },
                    { range: [1, 2], color: "#e1e7ec" },
                    { range: [2, 3], color: "#c4cfd9" },
                    { range: [3, 4], color: "#a7b8c6" },
                    { range: [4, 5], color: "#8aa1b4" },
                    { range: [5, 6], color: "#6e8ba1" },
                    { range: [6, 7], color: "#517590" },
                    { range: [7, 8], color: "#32607e" },
                    { range: [8, 9], color: "#004c6d" }
                    ]
                }   
            }
        ];
        
        let layout = { width: 400, height: 400, margin: { t: 0, b: 0 } };
        Plotly.newPlot("gauge", gauge_data, layout);
    
    })


    
}


function DrawBarchart (sampleId){
    console.log(`DrawBarchchart ${sampleId}`);
    d3.json('../../samples.json').then(data => 
        {
            let samples = data.samples;
            let resultArray = samples.filter(s => s.id === sampleId);
            let result = resultArray[0];
            
            

            let otu_ids = result.otu_ids;
            let otu_labels = result.otu_labels;
            let sample_values = result.sample_values;
            let yticks = otu_ids.slice(0,10).map(otuID => `OTU ID${otuID}`).reverse();

            let barData = {
                x: sample_values.slice(0,10).reverse(),
                y: yticks,
                type: "bar",
                text: otu_labels.slice(0,10).reverse(),
                orientation: "h"
            };

            let barArray = [barData];

            let layout = {
                title: "Top 10 Bacteria Cultures Found",
                showlegend: false,
                height: 400,
                width: 400
            };

            Plotly.newPlot("bar",barArray, layout);

        })

}

function DrawBubblechart (sampleId){
    console.log(`DrawBubblechart ${sampleId}`);
    d3.json("samples.json").then(data => 
        {   
            //grabbing and filtering specific test subject data
            let samples = data.samples;
            let resultArray = samples.filter(s => s.id == sampleId);
            let result = resultArray[0];
            console.log(`result.otu_ids ${result.otu_ids}`)
            console.log(`result.sample_values ${result.sample_values}`)

            let trace1 = {
                x: result.otu_ids,
                y: result.sample_values,
                text: result.otu_labels,
                mode: 'markers',
                marker: {
                    size: result.sample_values,
                    color: result.otu_ids,
                    sizeref: 2
                }
            };

            let bubble_data = [trace1];

            let layout = {
                title: "Bacteria Cultures per Sample",
                showlegend: false,
                height: 600,
                width: 1200
            };

            Plotly.newPlot("bubble",bubble_data,layout);

        })

}



function ShowMetaData (sampleId){
    console.log(`ShowMetadata ${sampleId}`);
    d3.json("samples.json").then(data => 
    {
        let metaData = data.metadata;
        let resultArray = metaData.filter(s => s.id == sampleId);
        let result = resultArray[0];

        let id = result.id;
        let id_str = `id: ${id}`;
        d3.select("#id").text(id_str);

        let ethnicity = result.ethnicity;
        let ethnicity_str = `ethnicity: ${ethnicity}`;
        d3.select("#ethnicity").text(ethnicity_str);

        let gender = result.gender;
        let gender_str = `gender: ${gender}`;
        d3.select("#gender").text(gender_str);

        let age = result.age;
        let age_str = `age: ${age}`;
        d3.select("#age").text(age_str);


        let location = result.location;
        let location_str = `location: ${location}`;
        d3.select("#location").text(location_str);

        let bbtype = result.bbtype;
        let bbtype_str = `bbtype: ${bbtype}`;
        d3.select("#bbtype").text(bbtype_str);

        let wfreq = result.wfreq;
        let wfreq_str = `wfreq: ${wfreq}`;
        d3.select("#wfreq").text(wfreq_str);

    })
}









function optionChanged(id) {
    console.log(`optionChanged to ${id}`);

   //display bar chart
    DrawBarchart(id);

    //display the bubble chart
    DrawBubblechart(id);

    //display gauge chart
    DrawGaugechart(id);

    //populate demographic info
    ShowMetaData(id);

    // ethnicity, gender, age, location, bbtype, wfreq
}


function InitDashboard()
{
        console.log("initializing dashboard");
        
        let selector = d3.select("#selDataset");

        d3.json("samples.json").then(data => {
            console.log(data)

        let sampleNames = data.names;

        sampleNames.forEach(sampleId => {
            selector.append("option")
                .text(sampleId)
                .property("value", sampleId);
        });

        let sampleId = sampleNames[0];

        DrawBarchart(sampleId);
        DrawBubblechart(sampleId);
        ShowMetaData(sampleId);
    });
}

InitDashboard();