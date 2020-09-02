function getData() {
    var hash = location.hash.slice(1);

    $.get("/code.json", { id: hash }, data => {
        console.log(data);
    });
};
