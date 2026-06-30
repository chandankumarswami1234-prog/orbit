/*package orbit_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class OrbitBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrbitBackendApplication.class, args);
	}

}
	*/

	package orbit_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
// This forces Spring to search the root and all sub-packages explicitly
@ComponentScan(basePackages = "orbit_backend") 
public class OrbitBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(OrbitBackendApplication.class, args);
    }
}
