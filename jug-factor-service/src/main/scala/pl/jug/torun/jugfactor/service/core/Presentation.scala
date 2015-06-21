package pl.jug.torun.jugfactor.service.core

import org.bson.types.ObjectId

case class Presentation(id:ObjectId, title: String, url: String, startTime: Long, duration: Long)
