$(() => {
    var cont = 1;

    $("#mais1").click(e => {
        e.preventDefault();
        cont++;

        var campo = $('<div></div>', {id: 'f' + cont })

        var ficheiro = $('<div></div>', {id: 'file' + cont });
        var ficheiroLabel = $('<label>Ficheiro:</label>');
        var ficheiroInput = $('<input/>', {type: "file", name: "file" });

        console.log(campo)

        console.log(ficheiro);
        console.log(ficheiroLabel);
        console.log(ficheiroInput);

        $("#lista").append(campo);

        $("#f" + cont).append(ficheiro);
        $("#file" + cont).append(ficheiroLabel, ficheiroInput)
    })
})