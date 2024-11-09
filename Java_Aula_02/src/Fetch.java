import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;

public class Fetch {
    public String get(String url) throws IOException, InterruptedException{
        var client = HttpClient.newHttpClient();
        URI link = URI.create(url);
        var req = HttpRequest.newBuilder(link).GET().build();
        HttpResponse<String> resp = client.send(req, BodyHandlers.ofString());
        return resp.body();
    }
 
}
