var database = firebase.database();
var user_name = (domo.env.userName == undefined) ? "someone?" : domo.env.userName.replace("+", " ");
Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});
$(window).on('load', function() {
    //  loader(true);
    get_firebaseData();
    get_completedRequests();
});
domo.onDataUpdate(function() {});

function get_firebaseData() {
    var html = '';
    var rootRef = database.ref();
    rootRef.once("value")
        .then(function(snapshot) {
            var value = snapshot.val();
            if (value) {
                var length = Object.keys(value).length;
                for (i = 0; i < length; i++) {
                    var key1 = Object.keys(value)[i];
                    var v = value[`${key1}`];

                    if (v.Name === user_name) {

                        html += `<tr style ="color: #FC8E14;" id=${key1}>`;
                        html += `<td class="t1">${v.Name}</td>`;
                        html += `<td class="t2">${v.Reason}</td>`;
                        html += `<td class="t3">${v.Comments}</td>`;
                        html += `<td class="t4">${v.StartDate}</td>`;
                        html += `<td class="t5">${v.EndDate}</td>`;
                        html += `<td class="t6">Pending</td>`;

                        html += `</tr>`;

                    }

                }
            }
        });
    domo.get('/data/v1/complete', { format: 'array-of-objects' }).then(function(data) {
        for (i = 0; i < data.length; i++) {
            var d = data[i];

            if (d.name === user_name) {

                html += `<tr>`;
                html += `<td class="t1">${d.name}</td>`;
                html += `<td class="t2">${d.reason}</td>`;
                html += `<td class="t3">${(d.comment == undefined) ? "" : d.comment}</td>`;
                html += `<td class="t4">${d.start}</td>`;
                html += `<td class="t5">${d.end}</td>`;
                html += `<td class="t6">${d.status}</td>`;
                html += `</tr>`;

            } else {
                //  loader(false);
            }
        }

    });

    domo.get('/data/v1/war', { format: 'array-of-objects' }).then(function(data) {
        for (i = 0; i < data.length; i++) {
            var d = data[i];

            if (d.name === user_name) {

                html += `<tr>`;
                html += `<td class="t1">${d.name}</td>`;
                html += `<td class="t2">War Room</td>`;
                html += `<td class="t3">Automated War</td>`;
                html += `<td class="t4">${d.wdate}</td>`;
                html += `<td class="t5">${d.pdate}</td>`;
                html += `<td class="t6">War Approved</td>`;
                html += `</tr>`;

            } else {
                //  loader(false);
            }
        }
        document.getElementById('requests').innerHTML += html;

    });
    //  loader(false);

}



function get_completedRequests() {
    var html = '';


    document.getElementById('requests').innerHTML += html;








}