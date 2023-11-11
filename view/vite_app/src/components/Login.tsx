

export default function Login() {

    /*function getCookie(name: string) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    
    <form onSubmit={() => {
            console.log(getCookie('csrftoken'))
        }}>
    */

    return (
        <div>
            <label>Username:</label>
            <input></input>
            
            <label>Password:</label>
            <input></input>
            <button type="submit" />
        </div>
    )
}