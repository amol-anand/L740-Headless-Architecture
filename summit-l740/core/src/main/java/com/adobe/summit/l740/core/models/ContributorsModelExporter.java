package com.adobe.summit.l740.core.models;

import static org.apache.sling.api.resource.ResourceResolver.PROPERTY_RESOURCE_TYPE;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.SearchResult;
import com.day.cq.search.result.Hit;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.*;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import com.adobe.granite.references.Reference;
import javax.annotation.PostConstruct;
import javax.inject.Named;
import javax.jcr.Session;
import javax.jcr.RepositoryException;
import java.util.Calendar;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.adobe.summit.l740.core.models.Contributor;

@Model(
        adaptables = { SlingHttpServletRequest.class },
        resourceType = "wknd/components/structure/page",
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
// name = the registered name of the exporter
// extensions = the extensions this exporter is registered to
// selector = defaults to "model", can override as needed; This is helpful if a single resource needs 2 different JSON renditions
@Exporter(name = "jackson", extensions = "json", selector = "contributors", options = {
        /**
         * Jackson options:
         * - Mapper Features: http://static.javadoc.io/com.fasterxml.jackson.core/jackson-databind/2.8.5/com/fasterxml/jackson/databind/MapperFeature.html
         * - Serialization Features: http://static.javadoc.io/com.fasterxml.jackson.core/jackson-databind/2.8.5/com/fasterxml/jackson/databind/SerializationFeature.html
         */
        @ExporterOption(name = "MapperFeature.SORT_PROPERTIES_ALPHABETICALLY", value = "true"),
        @ExporterOption(name = "SerializationFeature.WRITE_DATES_AS_TIMESTAMPS", value="false")
})
/**
 * For Jackson Annotations: https://github.com/FasterXML/jackson-annotations/wiki/Jackson-Annotations
 */
public class ContributorsModelExporter {

    private static final Logger log = LoggerFactory.getLogger(ContributorsModelExporter.class);

    @Self
    private SlingHttpServletRequest request;

    @Self
    private Resource resource;

    // Inject OSGi services
    @OSGiService
    @Required
    private QueryBuilder queryBuilder;

    // Injection will occur over all Injectors based on Ranking;
    // Force an Injector using @Source(..)
    // If an Injector is not working; ensure you are using the latest version of Sling Models
    @SlingObject
    @Required
    private ResourceResolver resourceResolver;

    // Internal state populated via @PostConstruct logic
    private Page page;
    public List<Contributor> contributors;
    private SearchResult result;

    @PostConstruct
    // PostConstructs are called after all the injection has occurred, but before the Model object is returned for use.
    private void init() {
        // Note that @PostConstruct code will always be executed on Model instantiation.
        // If the work done in PostConstruct is expensive and not always used in the consumption of the model, it is
        // better to lazy-execute the logic in the getter and persist the result in  model state if it is requested again.
        page = resourceResolver.adaptTo(PageManager.class).getContainingPage(resource);

        final Map<String, String> map = new HashMap<String, String>();

        map.put("path", "/content/experience-fragments/wknd/language-masters/en/contributors");
        map.put("type", "cq:Page");
        map.put("property","jcr:content/sling:resourceType");
        map.put("property.value","cq/experience-fragments/components/experiencefragment");

        Query query = queryBuilder.createQuery(PredicateGroup.create(map), resourceResolver.adaptTo(Session.class));
        this.result = query.getResult();
    }

    public List<Contributor> getContributors(){
      List<Contributor> tmpContributors = new ArrayList<Contributor>();
      for (final Hit hit : this.result.getHits()) {
            try {
                String title = hit.getTitle();
                String path = hit.getPath();
                Contributor contributor = new Contributor(title, path);
                tmpContributors.add(contributor);
            } catch (RepositoryException e) {
                log.error("Could not collect Search Results for Contributors.");
            }
      }
      return tmpContributors;
    }
}
