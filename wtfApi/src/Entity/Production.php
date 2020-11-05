<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Production
 *
 * @ORM\Table(name="production")
 * @ORM\Entity
 */
class Production
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     * 
     */
    private $id;
    // @ORM\OneToMany(targetEntity="App\Entity\Video", mappedBy="idProd")

    /**
     * @var string
     *
     * @ORM\Column(name="nom", type="string", length=60, nullable=false)
     */
    private $nom;

    /**
     * @ORM\OneToMany(targetEntity=Video::class, mappedBy="production")
     */
    private $video;

    public function __construct()
    {
        $this->video = new ArrayCollection();
    }

    public function serializeProduction() {
        return array(
            'id' => $this->getId(),
            'nom' => $this->getNom(),
        );
    }


    /**
     * @return Collection|Video[]
     */
    public function getVideo(): Collection
    {
        return $this->video;
    }

    public function addVideo(Video $video): self
    {
        if (!$this->video->contains($video)) {
            $this->video[] = $video;
            $video->setProduction($this);
        }

        return $this;
    }

    public function removeVideo(Video $video): self
    {
        if ($this->video->contains($video)) {
            $this->video->removeElement($video);
            // set the owning side to null (unless already changed)
            if ($video->getProduction() === $this) {
                $video->setProduction(null);
            }
        }

        return $this;
    }

    public function getNom(): ?string {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;
        return $this;
    }

    public function getId(): ?int
    {
        return $this->id;
    }


}
