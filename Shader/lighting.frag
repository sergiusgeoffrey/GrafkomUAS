  
#version 330 core
struct Material {
    vec3 diffuse;
    vec3 specular;
    float shininess;
};
struct Light {
    //For a directional light we dont need the lights position to calculate the direction.
    //Since the direction is the same no matter the position of the fragment we also dont need that.
    //vec3 direction;
    vec3 position;
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
};

uniform Light light;
uniform Material material;
uniform vec3 viewPos;

out vec4 FragColor;

in vec3 FragPos;
in vec3 Normal;
in vec2 TexCoords;

void main()
{
    // ambient
    vec3 ambient = light.ambient * material.diffuse;

    // diffuse 
    vec3 norm = normalize(Normal);
    vec3 lightDir = normalize(light.position - FragPos);//We still normalize the light direction since we techically dont know,
                                                    //wether it was normalized for us or not.
    float diff = max(dot(lightDir,norm), 0.0);
    vec3 diffuse = light.diffuse * diff * material.diffuse;

    // specular
    vec3 viewDir = normalize(viewPos - FragPos);
    vec3 reflectDir = reflect(-lightDir, norm);
    float spec = pow(max(dot(reflectDir,viewDir), 0.0), material.shininess);
    vec3 specular = light.specular * spec * material.specular;

    vec3 result = ambient + diffuse + specular;
    FragColor = vec4(result, 1.0);
}