// much of this code taken from Dom's Office Hours 12/11/21

console.log("this is plots.js")

function DrawBarchart (sampleId){
    console.log(`DrawBarchchart ${sampleId}`);
    d3.json('samples.json').then(data => 
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

            Plotly.newPlot("bar",barArray);

        })

}

function DrawBubblechart (sampleId){
    console.log(`DrawBubblechart ${sampleId}`);
    d3.json("samples.json").then(data => 
        {
            let samples = data.samples;
            let resultArray = samples.filter(s => s.id == sampleId);
            let result = resultArray[0];
            console.log(result)
        })

}



function ShowMetaData (sampleId){
    console.log(`ShowMetadata ${sampleId}`);
    d3.json("samples.json").then(data => 
    {
        let metaData = data.metadata;
        let resultArray = metaData.filter(s => s.id == sampleId);
        let result = resultArray[0];
        console.log(result);

    })
}

ShowMetaData()


function optionChanged(id) {
    console.log(`optionChanged to ${id}`);

   //display bar chart
    DrawBarchart(id);

    //display the bubble chart
    DrawBubblechart(id);

    //populate demographic info
    ShowMetaData(id);
    
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