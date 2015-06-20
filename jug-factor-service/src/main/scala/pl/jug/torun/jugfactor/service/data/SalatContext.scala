package pl.jug.torun.jugfactor.service.data

import com.novus.salat._
import com.novus.salat.json._

trait SalatContext {


  implicit val salatContext = new Context() {
    override val name = "custom_salat_context"
    override val typeHintStrategy = StringTypeHintStrategy(TypeHintFrequency.WhenNecessary, "_t")
    override val jsonConfig = JSONConfig(objectIdStrategy = StringObjectIdStrategy)

    registerGlobalKeyOverride(remapThis = "id", toThisInstead = "_id")
  }

}
