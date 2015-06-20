package pl.jug.torun.jugfactor.service.data

import com.mongodb.casbah.MongoClient
import com.softwaremill.macwire.MacwireMacros._
import com.typesafe.config.Config
import org.slf4j.LoggerFactory
import pl.jug.torun.jugfactor.service.core.AnnotationEventRepository

trait DataModule {

  val config: Config

  lazy val mongo = {
    val host = config.getString("mongo.host")
    val port = config.getInt("mongo.port")

    val logger = LoggerFactory.getLogger(classOf[DataModule])
    logger.info("Mongo client: host={} port={}", host, port)

    MongoClient(host, port)
  }

  lazy val db = mongo(config.getString("mongo.db"))

//  lazy val locationCollection = db(config.getString("mongo.collections.locations"))
//  lazy val locationRepository: LocationRepository = wire[MongoLocationRepository]

  lazy val annotationEventCollection = db(config.getString("mongo.collections.annotationEvents"))
  lazy val annotationEventRepository: AnnotationEventRepository = wire[MongoAnnotationEventRepository]
}
