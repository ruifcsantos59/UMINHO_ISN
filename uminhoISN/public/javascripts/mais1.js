$(() => {
    var cont = 1;

    $("#mais1").click(e => {
        e.preventDefault();
        cont++;

        var campo = $('<div></div>', {id: 'f' + cont })

        var ficheiro = $('<div></div>', {id: 'file' + cont });
        var ficheiroLabel = $('<label>Ficheiro: &nbsp</label>');
        var ficheiroInput = $('<input/>', {type: "file", name: "file" });

        $("#lista").append(campo);

        $("#f" + cont).append(ficheiro);
        $("#file" + cont).append(ficheiroLabel, ficheiroInput)
    })
})