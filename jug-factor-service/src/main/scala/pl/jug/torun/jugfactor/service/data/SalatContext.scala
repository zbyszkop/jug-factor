package pl.jug.torun.jugfactor.service.data

import com.mongodb.DBObject
import com.mongodb.casbah.commons.MongoDBObject
import com.novus.salat._
import com.novus.salat.json._
import com.novus.salat.transformers.CustomTransformer
import org.bson.types.ObjectId
import pl.jug.torun.jugfactor.service.core.Presentation

trait SalatContext {

  object PrensentationTransformer extends CustomTransformer[Presentation, DBObject] {

    def serialize(p: Presentation): DBObject =
      MongoDBObject("url" -> p.url, "title" -> p.title, "startTime" -> p.startTime, "duration" -> p.duration)

    def deserialize(o: DBObject): Presentation = {
//      val coordinates = o.get("coordinates").asInstanceOf[java.util.List[Double]]
      Presentation(/*o.get("id").asInstanceOf[ObjectId],*/ o.get("title").asInstanceOf[String], o.get("url").asInstanceOf[String],
        o.get("startTime").asInstanceOf[Long], o.get("duration").asInstanceOf[Long])
    }

  }

  implicit val salatContext = new Context() {
    override val name = "custom_salat_context"
    override val typeHintStrategy = StringTypeHintStrategy(TypeHintFrequency.WhenNecessary, "_t")
    override val jsonConfig = JSONConfig(objectIdStrategy = StringObjectIdStrategy)

    registerCustomTransformer(PrensentationTransformer)

    registerGlobalKeyOverride(remapThis = "id", toThisInstead = "_id")
  }

}
