$(() => {
    var cont = 1;

    $("#mais1").click(e => {
        e.preventDefault();
        cont++;

        var campo = $('<div></div>', {id: 'f' + cont })

        var desc = $('<div></div>', {id: 'desc' + cont });
        var descLabel = $('<label>Descrição</label>');
        var descInput = $('<input/>', { type: "text", name: "desc" });

        var ficheiro = $('<div></div>', {id: 'ficheiro' + cont });
        var ficheiroLabel = $('<label >Ficheiro:</label>');
        var ficheiroInput = $('<input/>', {type: "file", name: "ficheiro" });

        console.log(campo)
        console.log(desc);
        console.log(descLabel);
        console.log(descInput);

        console.log(ficheiro);
        console.log(ficheiroLabel);
        console.log(ficheiroInput);

        $("#lista").append(campo);

        $("#f" + cont).append(desc);
        $("#desc" + cont).append(descLabel, descInput);

        $("#f" + cont).append(ficheiro);
        $("#ficheiro" + cont).append(ficheiroLabel, ficheiroInput)
    })
})